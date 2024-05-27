import { Request, Response } from "express";
import fs from "node:fs/promises";
import { Readable } from "node:stream";
import { v4 as uuidv4 } from "uuid";

const IMAGES = process.env.IMAGES || "/tmp";

export function saveFile(req: Request, res: Response) {
  const filename = (req.query.filename as string) || "upload";
  const uuid = uuidv4();
  const blobname = `${uuid}:${filename}`;
  const stream = Readable.from(req.body);

  fs.open(`${IMAGES}/${blobname}`, "w")
    .then((file) => fs.writeFile(file, stream))
    .then(() => {
      res.status(201).send({
        url: `/images/${blobname}`
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failed to upload file to server filesysteem",
        error
      });
    });
}

export function getFile(req: Request, res: Response) {
  const { id } = req.params;

  fs.open(`${IMAGES}/${id}`)
    .then((file) => {
      const stream = file.createReadStream();
      res.send(stream);
    })
    .catch((error: Error) => {
      res.status(404).send({
        message: `Not Found: ${id}`,
        error
      });
    });
}
