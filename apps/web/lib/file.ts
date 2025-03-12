import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
const BUCKET_NAME = "replit-project";
const REGION = "ap-southeast-2";

export async function copyS3Folder(sourceDirectory: string, destinationDirectory: string) {
    const client = new S3Client({
        region: REGION,
    });

    const listObjectsCommand = new ListObjectsCommand({
        Bucket: BUCKET_NAME,
        Prefix: sourceDirectory,
    });

    const { Contents } = await client.send(listObjectsCommand);

    if (!Contents?.length) return;

    for (const content of Contents) {
        if (!content.Key) continue;

        const getObjectCommand = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: content.Key,
        });

        const objectData = await client.send(getObjectCommand);

        if (!objectData.Body) continue;

        const data = await objectData.Body.transformToByteArray();
        // const buffer = await streamToBuffer(objectData.Body); // Convert stream to buffer

        const uploadObjectCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: content.Key.replace(sourceDirectory, destinationDirectory),
            Body: data,
        });

        await client.send(uploadObjectCommand);
    }

}