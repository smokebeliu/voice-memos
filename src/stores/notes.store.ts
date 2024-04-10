import {TNote} from 'shared/types/note'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface INotesState {
  isNew: boolean
  selectedNote: TNote | null
  notes: TNote[]
  cancel: () => void
  addNote: () => void
  editNote: (note: TNote) => void
  deleteNote: (note: TNote) => void
  saveNote: (note: TNote) => void
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

export const useNotesStore = create<INotesState>()(
  persist(
    (set, get) => ({
      isNew: false,
      selectedNote: null,
      notes: [],
      cancel: () => {
        set({selectedNote: null, isNew: false})
      },
      addNote: () => {
        set({isNew: true, selectedNote: null})
      },
      editNote: (note) => {
        set({selectedNote: note, isNew: false})
      },
      deleteNote: (note) => {
        set({notes: get().notes.filter((n) => n.id !== note.id), selectedNote: null, isNew: false})
      },
      saveNote: (note) => {
        if (note.id) {
          set({notes: [note, ...get().notes.filter((n) => n.id !== note.id)], selectedNote: null, isNew: false})
        } else {
          set({notes: [note, ...get().notes], selectedNote: null, isNew: false})
        }
      },
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => {
        set({hasHydrated})
      }
    }),
    {
      name: 'notes',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
)
