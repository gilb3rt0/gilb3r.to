import { useMemo } from 'react'
import WhiteBlackText from '@/components/canvas/WhiteBlackText'

const ProjectTitle = ({ title, position, scale }) => {
  const titleArray = title.split(' ')
  // create strings with a max length of 25 characters from the titleArray and push them into the titleLines array
  const titleLines = []
  let titleLine = ''
  for (let i = 0; i < titleArray.length; i++) {
    if (titleLine.length + titleArray[i].length < 15) {
      titleLine += titleArray[i] + ' '
    } else {
      titleLines.push(titleLine)
      titleLine = titleArray[i] + ' '
    }
  }
  titleLines.push(titleLine)
  // get all characters in the title
  const titleCharacters = useMemo(() => {
    const characters = []
    for (let i = 0; i < title.length; i++) {
      characters.push(title.charAt(i))
    }
    return characters
  }, [title])

  return (
    <group position={position} scale={scale}>
      <group position-y={titleLines.length > 1 && titleLines.length * 0.25}>
        {titleLines.map((line, index) => {
          return <WhiteBlackText text={line} index={index} key={index} />
        })}
      </group>
    </group>
  )
}

export default ProjectTitle
