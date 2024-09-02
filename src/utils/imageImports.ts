const isTest = process.env.NODE_ENV === "test"

export const getBackgroundImage = () => {
  if (isTest) {
    return "test-file-stub"
  }
  return new URL("../assets/background.png", import.meta.url).href
}
