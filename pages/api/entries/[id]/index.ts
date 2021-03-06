import type { NextApiRequest, NextApiResponse } from "next";
// import mongoose from "mongoose";

import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "El id no es válido." });
  // }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe!" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryById = await Entry.findById(id);
  await db.disconnect();

  if (!entryById) {
    return res.status(400).json({ message: "No hay entrada con el ID: " + id });
  }

  return res.status(200).json(entryById!);
};
const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryById = await Entry.findByIdAndDelete(id);
  await db.disconnect();

  if (!entryById) {
    return res.status(400).json({ message: "No hay entrada con el ID: " + id });
  }

  return res.status(200).json(entryById!);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con el ID: " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    res.status(200).json(updateEntry!);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: error.errors.status.message });
  }
};
