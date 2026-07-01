export const persistAuthData = (response) => {
  const payload = response?.data || response || {};
  const token = payload?.token || payload?.accessToken || payload?.data?.token || null;
  const user = payload?.user || payload?.data?.user || payload?.profile || payload?.data?.profile || null;

  if (token) {
    localStorage.setItem('token', token);
  }

  const authPayload = {
    ...payload,
    token,
    user,
  };

  localStorage.setItem('user', JSON.stringify(authPayload));

  return authPayload;
};
