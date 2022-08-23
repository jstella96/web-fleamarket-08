import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { ProductDto } from './dto/product.dto';
import { ProductImage } from './entities/product-image.entity';
import { ProductLike } from './entities/product-like.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  async create(productDto: ProductDto, userId: number) {
    const { title, content, imageUrls, price, categoryId } = productDto;

    const user = await User.createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.primaryRegion',
        'user.userRegions',
        'region',
        'region.isPrimary=true'
      )
      .where(`user.id=${userId}`)
      .getOne();

    const images = imageUrls?.map((imageUrl) =>
      ProductImage.create({ imageUrl })
    );

    if (images) {
      await Promise.all(images.map((image) => image.save()));
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

    return product;
  }

  async findAll(userId: number) {
    const products = await Product.getProductQuery(userId)
      .select(['product', 'author', 'thumbnail', 'isLiked', 'region'])
      .getMany();

    return products.map((product) => ({
      ...product,
      isLiked: product['isLiked'] ? true : false,
    }));
  }

  async findOne(id: number, userId: number) {
    const product = await Product.getProductQuery(userId)
      .select(['product', 'author', 'isLiked', 'images', 'region'])
      .where(`product.id=${id}`)
      .getOne();

    product['isLiked'] = product['isLiked'] ? true : false;

    return product;
  }

  async update(id: number, productDto: ProductDto, userId: number) {
    const { title, content, imageUrls, price, categoryId } = productDto;

    // FIXME
    const tempUserId = 76844355;

    // const images = imageUrls.map((imageUrl) =>
    //   ProductImage.update({ imageUrl })
    // );

    await Product.createQueryBuilder('product')
      .update({
        title,
        content,
        price,
        category: {
          id: categoryId,
        },
        // TODO: image 수정
        // images,
      })
      .where(`product.id=${id}`)
      .execute();

    const product = await Product.getProductQuery(tempUserId)
      .select(['product', 'author', 'isLiked', 'images', 'region'])
      .where(`product.id=${id}`)
      .getOne();

    product['isLiked'] = product['isLiked'] ? true : false;

    return product;
  }

  async remove(id: number, userId: number) {
    const result = await Product.delete({ id });

    return result;
  }

  async like(id: number, userId: number) {
    // FIXME
    const tempUserId = 76844355;

    const productLike = await ProductLike.findOneBy({
      product: { id },
      user: { id: tempUserId },
    });

    let result;
    if (productLike) {
      result = await ProductLike.createQueryBuilder()
        .delete()
        .from(ProductLike)
        .where(`product_id=${id} and user_id=${tempUserId}`)
        .execute();
    } else {
      result = await ProductLike.createQueryBuilder()
        .insert()
        .into(ProductLike)
        .values({
          product: { id },
          user: { id: tempUserId },
        })
        .execute();
    }

    return result;
  }
}
