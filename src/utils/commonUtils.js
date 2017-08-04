/**
 * 公用工具函数
 * @class CommonUtils
 */
class CommonUtils {
  /**
   * 返回数组中所有项目个数
   * @static
   * @param {Array} arr 要测试的数组
   * @param {Object} countObj 为了引用传递而创建的对象
   * @returns {Number} 项目个数
   * @memberOf CommonUtils
   */
  static countAllItems(arr, countObj = { count: 0 }) {
    // arr不是数组或计数错误，直接返回空数组
    if (!Array.isArray(arr) || (!Number.isInteger(countObj.count) || countObj.count < 0)) {
      return 0;
    }
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        CommonUtils.countAllItems(item, countObj);
      } else {
        countObj.count += 1;
      }
    });
    return countObj.count;
  }
  /**
   * 给数组分组
   * @static
   * @param {Array} arr 待分组的数组
   * @param {Number} singleGroupCount 单组的数量
   * @param {Function} filterFn 过滤函数，可选
   * @param {Function} sortBy 排序函数，可选
   * @returns {Array}
   * @memberOf CommonUtils
   */
  static groupArray(arr, singleGroupCount, sortBy = undefined, filterFn = () => true) {
    if (!Array.isArray(arr) || (!Number.isInteger(singleGroupCount) || singleGroupCount <= 0)) {
      return [];
    }
    const oldArr = sortBy ? arr.filter(filterFn).sort(sortBy) : arr.filter(filterFn);
    /** 分组完成的新数组 */
    const newArr = [];
    for (let i = 0, k = 0; i < oldArr.length; k += 1) {
      newArr[k] = [];
      for (let j = 0; i < oldArr.length && j < singleGroupCount; i += 1, j += 1) {
        newArr[k].push(oldArr[i]);
      }
    }
    return newArr;
  }
}
export default CommonUtils;
