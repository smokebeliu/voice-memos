import {FC, memo} from 'react'
import {Flex, Text} from '@chakra-ui/react'
import {TNote} from 'shared/types/note'
import {format} from 'date-fns/format'

interface IProps {
  note: TNote
  onClick: (note: TNote) => void
}

const NoteItemRaw: FC<IProps> = ({note, onClick}) => {
  return (
    <Flex
      onClick={() => onClick(note)}
      cursor={'pointer'}
      h={'40px'}
      w={'100%'}
      p={'0 8px'}
      align={'center'}
      bgColor={'custom.lightestGray'}
      borderRadius={'8px'}
      justify={'space-between'}
      _hover={{
        opacity: 0.8
      }}>
      <Text overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} textStyle={'md'} color={'custom.gray'}>
        {note.description}
      </Text>
      <Flex flexDirection={'column'} align={'end'} w={'65px'} flexShrink={0} ml={'12px'}>
        <Text textStyle={'sm'} color={'custom.lightGray'}>
          {format(note.updatedAt, 'p')}
        </Text>
        <Text textStyle={'sm'} color={'custom.lightGray'}>
          {format(note.updatedAt, 'P')}
        </Text>
      </Flex>
    </Flex>
  )
}

export const NoteItem = memo(NoteItemRaw)
