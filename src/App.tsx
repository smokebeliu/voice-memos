import {Button, Center, Divider, Flex, Spinner, Text} from '@chakra-ui/react'
import {NoteForm, NoteItem} from 'components'
import {useNotesStore} from 'stores'

export const App = () => {
  const [hasHydrated, isNew, selectedNote, notes, onSave, onDelete, onEdit, onAddNew, onCancel] = useNotesStore(
    (state) => [
      state.hasHydrated,
      state.isNew,
      state.selectedNote,
      state.notes,
      state.saveNote,
      state.deleteNote,
      state.editNote,
      state.addNote,
      state.cancel
    ]
  )

  return (
    <Flex h={'100vh'} justifyContent={'center'}>
      {!hasHydrated && (
        <Center>
          <Spinner color={'custom.accent'} />
        </Center>
      )}
      {hasHydrated && (
        <Flex w={'100%'} maxW={'700px'} flexDirection={'column'} p={'20px'}>
          <Flex justify={'space-between'} align={'center'}>
            <Text textStyle={'lg'}>My Voice Memos</Text>
            <Button variant={'accent'} onClick={onAddNew}>
              Add note
            </Button>
          </Flex>

          <Divider orientation={'horizontal'} m={'20px 0'} bgColor={'custom.black'} />
          <Flex overflow={'scroll'} flexDirection={'column'}>
            {isNew && <NoteForm onSave={onSave} onCancel={onCancel} />}
            <Flex flexDirection={'column'} gap={'8px'}>
              {notes.map((note) => {
                if (selectedNote?.id === note.id) {
                  return (
                    <NoteForm key={`${note.id}`} note={note} onSave={onSave} onCancel={onCancel} onDelete={onDelete} />
                  )
                }
                return <NoteItem key={note.id} note={note} onClick={onEdit} />
              })}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
