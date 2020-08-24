function Pager(nowPage, totalCnt, pn = 10 ,cn = 10) {
    
    let endPage = Math.ceil(nowPage / cn) * cn;
    let returnData = {
        endPage:  endPage,
        startPage: endPage - cn + 1,
        totalPage: Math.ceil(totalCnt / pn),
        nowPage: nowPage,
        next:true,
        before:false
    };

    if(returnData.startPage != 1){
        returnData.before = true;
    }

    if(returnData.totalPage <= returnData.endPage){
        returnData.next = false;
        returnData.endPage = returnData.totalPage;
    }

    return returnData;
}

module.exports.Pager = Pager;