import {FC, useEffect, useRef, useState} from 'react'
import {Button, Flex, Icon, Textarea, useToast} from '@chakra-ui/react'
import {createIcon} from '@chakra-ui/react'

import {TNote} from 'shared/types/note'
import {useSpeechRecognition} from 'shared/hooks'
import './NoteForm.css'

interface IProps {
  note?: TNote
  onDelete?: (note: TNote) => void
  onSave: (note: TNote) => void
  onCancel: () => void
}

export const NoteForm: FC<IProps> = ({note, onSave, onCancel, onDelete = () => {}}) => {
  const toast = useToast()

  const {
    isEnable: isSpeechEnable,
    isSpeech,
    toggleSpeechRecognition,
    recognizedText,
    error: speechError
  } = useSpeechRecognition()

  const [isError, setIsError] = useState(false)
  const [description, setDescription] = useState(note?.description || '')
  const [insertIndex, setInsertIndex] = useState(0)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleSave = () => {
    if (!description) {
      setIsError(true)
      return
    }
    if (description === note?.description) {
      onCancel()
      return
    }
    onSave({id: note?.id || Date.now().toString(), description, updatedAt: new Date()})
  }

  const handleVoiceInput = () => {
    toggleSpeechRecognition()
    if (!isSpeech) {
      setInsertIndex(textareaRef.current?.selectionStart || description.length)
    }
  }

  useEffect(() => {
    if (!recognizedText) {
      return
    }
    if (insertIndex === 0) {
      setDescription(`${recognizedText} ${description}`)
      return
    }
    setDescription(
      `${description.substring(0, insertIndex).trimEnd()} ${recognizedText} ${description.substring(insertIndex)}`
    )
  }, [recognizedText])

  useEffect(() => {
    if (speechError) {
      toast({
        title: 'Error occurred during speech recognition',
        description: speechError,
        status: 'error',
        duration: 10000,
        position: 'top',
        isClosable: true
      })
    }
  }, [speechError])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.selectionStart = description.length
    }
  }, [textareaRef])

  return (
    <Flex flexDirection={'column'} mb={'20px'}>
      <Flex position={'relative'} mb={'12px'}>
        <Textarea
          borderColor={isError ? 'custom.danger' : 'transparent'}
          isDisabled={isSpeech}
          ref={textareaRef}
          minH={'300px'}
          borderRadius={'8px'}
          p={'8px'}
          bgColor={'custom.lightestGray'}
          value={description}
          _focus={{outline: 'none'}}
          _hover={{outline: 'none'}}
          onChange={(e) => setDescription(e.target.value)}
        />
        {isSpeechEnable && (
          <Button
            onClick={handleVoiceInput}
            className={isSpeech ? 'pulse' : ''}
            p={0}
            w={'40px'}
            zIndex={'50'}
            variant={'accent'}
            position={'absolute'}
            bottom={'8px'}
            right={'8px'}>
            <Icon color={'custom.white'} as={Microphone} />
          </Button>
        )}
      </Flex>
      <Flex justify={'space-between'}>
        {note ? (
          <Button isDisabled={isSpeech} variant={'danger'} onClick={() => onDelete(note)}>
            Delete
          </Button>
        ) : (
          <Flex />
        )}
        <Flex>
          <Button isDisabled={isSpeech} variant={'outline'} onClick={onCancel} mr={'8px'}>
            Cancel
          </Button>
          <Button isDisabled={isSpeech} variant={'accent'} onClick={handleSave}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

const Microphone = createIcon({
  displayName: 'Microphone',
  viewBox: '0 0 512 512',
  path: [
    <path
      fill="currentColor"
      d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"
    />,
    <path
      fill="currentColor"
      d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"
    />
  ]
})
