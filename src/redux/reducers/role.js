const role = (prevState = [], action) => {
    // console.log(action);
    let { type, payload } = action
    switch (type) {
        case "stelele":
            var aaaa = [...prevState, ...payload]
            aaaa.roleList = payload
            return aaaa
        default:
            return prevState
    }

}// 只要状态一返回 自
export default role