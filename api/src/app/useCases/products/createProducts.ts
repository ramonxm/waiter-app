import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function createProducts(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      imagePath,
      description,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
