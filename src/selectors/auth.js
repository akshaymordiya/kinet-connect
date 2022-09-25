export const getAuthData = (state) => state.auth

export const getIsUserAuthenticated = (state) => getAuthData(state)?.isAuthenticated

export const getIsUserProfileActivated = (state) => getAuthData(state)?.isProfileActivated

export const getAuthenticatedUser = (state) => getAuthData(state)?.user