import { Injectable } from '@nestjs/common';
import { PRODUCT_LIMIT } from 'src/constants/page';
import { User } from 'src/user/entities/user.entity';
import { ProductDto } from './dto/product.dto';
import { ProductImage } from './entities/product-image.entity';
import { ProductLike } from './entities/product-like.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  async create(productDto: ProductDto, userId: number) {
    const { title, content, imageUrls, price, categoryId } = productDto;

    const user = await User.getUserWithPrimaryRegion(userId);

    const images = imageUrls?.map((imageUrl) =>
      ProductImage.create({ imageUrl })
    );

    if (images) {
      for (const image of images) {
        await image.save();
      }
    }

    const product = Product.create({
      title,
      content,
      price,
      user,
      category: {
        id: categoryId,
      },
      region: {
        code: user.primaryRegion.regionCode,
      },
      images,
    });

    await product.save();

    return await Product.getOne(product.id, userId);
  }

  async findAll(
    userId: number,
    isSale?: boolean,
    categoryId?: number,
    page?: number,
    regionCode?: number
  ) {
    let productsQuery = Product.getProductQuery(userId)
      .select(['product', 'author', 'thumbnail', 'isLiked', 'region'])
      .where(isSale ? `author.id=${userId}` : '');

    if (categoryId) {
      productsQuery = productsQuery.andWhere(`category.id=${categoryId}`);
    }
    if (regionCode) {
      productsQuery = productsQuery.andWhere(`region.code=${regionCode}`);
    }

    productsQuery = productsQuery
      .skip(page * PRODUCT_LIMIT)
      .take(PRODUCT_LIMIT)
      .orderBy('product.id', 'DESC');

    const products = await productsQuery.getMany();

    return products.map((product) => ({
      ...product,
      isLiked: product['isLiked'] ? true : false,
    }));
  }

  async findLikedProduct(userId: number) {
    const products = await Product.getProductQuery(userId)
      .select(['product', 'author', 'thumbnail', 'isLiked', 'region'])
      .getMany();
    return products.filter((product) => product['isLiked']);
  }

  async findOne(id: number, userId: number) {
    return await Product.getOne(id, userId);
  }

  async update(id: number, productDto: ProductDto, userId: number) {
    const { title, content, imageUrls, price, categoryId } = productDto;

    const prevImage = await ProductImage.findBy({ product: { id: id } });
    ProductImage.remove(prevImage);

    const images = imageUrls?.map((imageUrl) =>
      ProductImage.create({
        product: { id: id },
        imageUrl: imageUrl,
      })
    );

    for (const image of images) {
      await image.save();
    }

    await Product.createQueryBuilder('product')
      .update({
        title,
        content,
        price,
        category: {
          id: categoryId,
        },
      })
      .where(`product.id=${id}`)
      .execute();

    return Product.getOne(id, userId);
  }

  async remove(id: number, userId: number) {
    ProductImage.delete({ product: { id: id } });
    const result = await Product.delete({ id });
    return result;
  }

  async like(id: number, userId: number) {
    const productLike = await ProductLike.findOneBy({
      product: { id },
      user: { id: userId },
    });

    let result;
    if (productLike) {
      result = await ProductLike.createQueryBuilder()
        .delete()
        .from(ProductLike)
        .where(`product_id=${id} and user_id=${userId}`)
        .execute();
    } else {
      result = await ProductLike.createQueryBuilder()
        .insert()
        .into(ProductLike)
        .values({
          product: { id },
          user: { id: userId },
        })
        .execute();
    }

    return result;
  }
}
