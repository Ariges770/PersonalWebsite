import fs from "fs"
import path from "path"

const folderPath = "./public"
const relativeFolderPath = path.relative(process.cwd(), folderPath)

export default function () {
    const files = fs
        .readdirSync(folderPath)
    return files
}