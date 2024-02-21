export const scrollToSection = (sectionName: string, smooth = true) => {
  const section = document.getElementById(sectionName)
  const behavior = smooth ? 'smooth' : 'auto'

  if (section) {
    section.scrollIntoView({ behavior })
  }
}
