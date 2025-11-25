/**
 * 로그인한 사용자의 ROLE이 ROLE_ADMIN이면 true
 * 아닐 경우, 로그인 사용자의 email과 author의 email이 같으면 true
 * @param {*} userInfo 나의 정보.
 * @param {*} author 확인하고자 하는 데이터의 작성자 (이메일)
 */

export const isResourceOwner = (userInfo, author) => {
  console.log(userInfo);
  if (userInfo.roles.includes("ROLE_ADMIN")) {
    return true;
  }
  return userInfo.email === author;
};
