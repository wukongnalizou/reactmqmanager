/**
 * 本地数据存取的方法
 */
export function setData(name, data) {
  if (!data) return false;
  let datas = '';
  if (data instanceof Object) {
    datas = JSON.stringify(data);
  } else {
    datas = data;
  }
  window.localStorage[name] = datas;
}
export function setSessionData(name, data) {
  if (!data) return false;
  let datas = '';
  if (data instanceof Object) {
    datas = JSON.stringify(data);
  } else {
    datas = data;
  }
  window.sessionStorage[name] = datas;
}
export function getData(name) {
  const data = window.localStorage[name];
  if (data) {
    if (data instanceof Object) {
      return JSON.parse(data);
    } else {
      return data;
    }
  } else {
    return false;
  }
}
export function getSessionData(name) {
  let data = window.sessionStorage[name];
  if (data) {
    if (data instanceof Object) {
      return JSON.parse(data);
    } else {
      return data;
    }
  } else {
    return false;
  }
}

export function removeData(name) {
  let data = window.localStorage[name];
  if (data) {
    data = window.localStorage[name];
    window.localStorage.removeItem(name);
    return true;
  }
  return false;
}

export function removeSessionData(name) {
  let data = window.sessionStorage[name];
  if (data) {
    data = window.sessionStorage[name];
    window.sessionStorage.removeItem(name);
    return true;
  }
  return false;
}
