import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

/**
 * Base repository providing generic CRUD operations.
 * All entity-specific repositories extend this class.
 */
export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string, select?: string): Promise<T | null> {
    const query = this.model.findById(id);
    if (select) query.select(select);
    return query.exec();
  }

  async findOne(
    filter: FilterQuery<T>,
    select?: string
  ): Promise<T | null> {
    const query = this.model.findOne(filter);
    if (select) query.select(select);
    return query.exec();
  }

  async findMany(
    filter: FilterQuery<T> = {},
    options: {
      select?: string;
      sort?: Record<string, 1 | -1>;
      skip?: number;
      limit?: number;
      populate?: string | string[];
    } = {}
  ): Promise<T[]> {
    let query = this.model.find(filter);

    if (options.select) query = query.select(options.select);
    if (options.sort) query = query.sort(options.sort);
    if (options.skip) query = query.skip(options.skip);
    if (options.limit) query = query.limit(options.limit);
    if (options.populate) {
      const paths = Array.isArray(options.populate) ? options.populate : [options.populate];
      paths.forEach((path) => {
        query = query.populate(path);
      });
    }

    return query.exec();
  }

  async updateById(
    id: string,
    update: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, update, { new: true, ...options })
      .exec();
  }

  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T | null> {
    return this.model
      .findOneAndUpdate(filter, update, { new: true, ...options })
      .exec();
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    return (await this.model.find(filter).exec()) as any[];
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const doc = await this.model.exists(filter);
    return !!doc;
  }
}
