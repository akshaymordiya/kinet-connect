
export const mapUserResponse = (res) => {
    
  return {
    ...res,
    avatarURL: {
      url: res.avatarURL,
      isDefault: (res?.avatarURL === "" || ['male', 'female'].includes(res?.avatarURL))
    }
  }
}