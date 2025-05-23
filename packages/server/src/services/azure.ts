import { Request, Response } from "express";
import { Readable } from "node:stream";
import {
  BlobServiceClient,
  BlobUploadCommonResponse
} from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

const STORAGE_ACCOUNT =
  process.env.AZURE_STORAGE_ACCOUNT_NAME || "blazing";
const STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;

const STORAGE_CONTAINER = "uploads";

const blobServiceClient =
  BlobServiceClient.fromConnectionString(
    `DefaultEndpointsProtocol=https;AccountName=${STORAGE_ACCOUNT};AccountKey=${STORAGE_ACCESS_KEY};EndpointSuffix=core.windows.net`
  );

const containerClient = blobServiceClient.getContainerClient(
  STORAGE_CONTAINER
);

export function uploadBlob(req: Request, res: Response) {
  const filename = (req.query.filename as string) || "upload";
  const uuid = uuidv4();
  const blobname = `${uuid}:${filename}`;
  const blockBlobClient =
    containerClient.getBlockBlobClient(blobname);
  const stream = Readable.from(req.body);

  blockBlobClient
    .uploadStream(stream)
    .then((blobResponse: BlobUploadCommonResponse) => {
      res.status(201).send({
        url: `/images/${blobname}`,
        md5: blobResponse.contentMD5
      });
    })
    .catch((error) => {
      console.log("Blob upload error:", error);
      res.status(500).send({
        message: "failed to upload to blob storage",
        error
      });
    });
}

export function downloadBlob(req: Request, res: Response) {
  const { blob } = req.params;
  const blockBlobClient =
    containerClient.getBlockBlobClient(blob);

  blockBlobClient
    .exists()
    .then((exists: boolean) => {
      if (!exists) {
        res.status(404).send();
      } else {
        blockBlobClient
          .downloadToBuffer()
          .then((buf: Buffer) => {
            res.send(buf);
          });
      }
    })
    .catch((error) => {
      console.log("Blob download error:", error);
      res.status(500).send({
        message: "failed to download from blob storage",
        error
      });
    });
}
