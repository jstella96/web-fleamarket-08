import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { ProductDto } from './dto/product.dto';
import { ProductImage } from './entities/product-image.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  async create(productDto: ProductDto, userId: number) {
    const { title, content, imageUrls, price, categoryId } = productDto;

    // FIXME
    const tempUserId = 76844355;

    const user = await User.createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.primaryRegion',
        'user.userRegions',
        'region',
        'region.isPrimary=true'
      )
      .where(`user.id=${tempUserId}`)
      .getOne();

    const images = imageUrls.map((imageUrl) =>
      ProductImage.create({ imageUrl })
    );

    await Promise.all(images.map((image) => image.save()));

    const product = Product.create({
      title,
      content,
      price,
      user,
      category: {
        id: categoryId,
      },
      region: {
        code: user.primaryRegion.region_code,
      },
      images,
    });

    await product.save();

    return product;
  }

  async findAll(userId: number) {
    // FIXME
    const tempUserId = 76844355;

    const products = await Product.getProductQuery(tempUserId)
      .select(['product', 'author', 'thumbnail', 'isLiked'])
      .getMany();

    return products.map((product) => ({
      ...product,
      isLiked: product['isLiked'] ? true : false,
    }));
  }

  async findOne(id: number, userId: number) {
    // FIXME
    const tempUserId = 76844355;

    const product = await Product.getProductQuery(tempUserId)
      .select(['product', 'author', 'isLiked', 'images'])
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
      .select(['product', 'author', 'isLiked', 'images'])
      .where(`product.id=${id}`)
      .getOne();

    product['isLiked'] = product['isLiked'] ? true : false;

    return product;
  }

  async remove(id: number, userId) {
    const result = await Product.delete({ id });

    return result;
  }
}
