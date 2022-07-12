import { model, Schema } from 'mongoose'

const ProductSchema = new Schema<ProductDBO>(
  {
    title: {
      unique: true,
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    price: {
      required: true,
      type: Number
    },
    moneda: {
      required: true,
      type: String
    },
    stock: {
      required: true,
      type: Number
    },
    img: {
      required: true,
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: Date
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
      }
    }
  }
)

const ProductModel = model<ProductDBO>('product', ProductSchema)

export { ProductModel }
