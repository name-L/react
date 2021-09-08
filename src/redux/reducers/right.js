const right = (prevState = [], action) => {
    // console.log(action);
    let { type, payload } = action
    switch (type) {
        case "setright":
            var bbb = [...prevState, ...payload]
            bbb.rightList = payload
            return bbb
        default:
            return prevState
    }

}// 只要状态一返回 自
export default right