# Simple Image Compressor API

## Overview

The Simple Image Compressor API is a serverless function designed to reduce the size of images, making them suitable for web usage while balancing quality and compression. It uses a custom algorithm tailored for web development that ensures the compressed image retains an acceptable level of quality.

## How It Works

This API accepts an image file via a POST request and compresses it to a specified maximum size. It is perfect for applications where image size reduction is necessary without significant loss of clarity, such as in web development, mobile applications, or when storing images in environments where space is a constraint.

## Usage

### Endpoint

`POST https://yourhost.com/`

### Body

- **Type:** `multipart/form-data`
- **Content:** A single image file.

### Query Parameters

- **maxSize:** The maximum size for the compressed image in kilobytes. Default is 300 KB.

### Example Request

Here's how to make a request using `curl`:

```bash
curl -X POST https://yourhost.com/ \
     -F "image=@path_to_your_image.jpeg" \
     -H "Content-Type: multipart/form-data" \
     -G -d "maxSize=300"
```
Replace `path_to_your_image.jpeg` with the path to the image you wish to compress.

### Hosting Considerations
This function relies on the sharp library for image processing, which may not be supported on all serverless platforms. For example, platforms like Vercel do not support native extensions required by sharp. An alternative hosting solution that supports sharp is Render, which allows more flexibility in terms of native dependencies.

### Deployment
To deploy this function:

- Ensure your hosting provider supports the `sharp` library.
- Deploy the function as per the provider's usual deployment process, ensuring environment variables and other configurations are set accordingly.
