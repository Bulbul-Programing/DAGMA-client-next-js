export const createPath = (paths: string[]) => {
    let exportPath = []
    for (let i = 0; i < paths.length; i++) {
        const element = {
            path: paths[i].toLowerCase(),
            label: paths[i]
        }
        exportPath.push(element)
    }
    return exportPath
}