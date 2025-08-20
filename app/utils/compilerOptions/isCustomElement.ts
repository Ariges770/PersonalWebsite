export default function(tag: string) {
    return ["mjx", "test"].some((name) => tag.startsWith(name))
    // return tag.toLowerCase().startsWith("mjx")
}