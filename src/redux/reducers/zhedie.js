const zhedie = (prevState =false, action) => {
    console.log(action);
    let { type, payload } = action
    switch (type) {
        case "Mylele":
            return payload
        default:
            return prevState
    }

}// 只要状态一返回 自
export default zhedie