const sharp = require("sharp");

async function compressImage(inputBuffer, maxSize = 300) {
    try {
        const firstSize = inputBuffer.length;
        let quality = 90;
        let compressedBuffer = inputBuffer;
        let width = (
            await sharp(compressedBuffer, { failOn: "none" }).metadata()
        ).width;

        while (compressedBuffer.length / 1024 > maxSize && quality >= 10) {
            compressedBuffer = await sharp(compressedBuffer, { failOn: "none" })
                .resize({
                    width:
                        Math.round(
                            0.9 *
                                (
                                    await sharp(compressedBuffer, {
                                        failOn: "none",
                                    }).metadata()
                                ).width
                        ) || width,
                })
                .jpeg({ quality })
                .rotate()
                .toBuffer();
            quality -= 10;
        }

        console.log(
            "FIRST SIZE",
            firstSize,
            "CURRENT SIZE",
            compressedBuffer.length
        );
        return compressedBuffer;
    } catch (error) {
        console.log("COMPRESS FAILED", error);
        return "FAIL";
    }
}

module.exports = compressImage;
