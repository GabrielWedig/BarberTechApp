export const scrollToSection = (sectionName: string) => {
  const section = document.getElementById(sectionName)

  if (section) {
    section.scrollIntoView()
  }
}
