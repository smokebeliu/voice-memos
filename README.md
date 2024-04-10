## My Voice Memos
Web application that enables users to create memos using voice or keyboard input

<img width="403" alt="Снимок экрана 2024-04-10 в 11 19 40" src="https://github.com/smokebeliu/voice-memos/assets/2237055/824c8ea0-a0e9-4ab3-85df-068f0d2ae18f">

### Features:
- Create a memo with keyboard/voice input
- Edit a memo with keyboard/voice input
- Delete a memo
- Recently updated memo shows on top of the list

### Design decision:

Main goal of application to create memos with voice input and this approach is more popular on mobile devices, that why I decided to make it mobile first. The application is designed to be used on mobile devices, but it is also responsive and can be used on desktops.

### Project structure:
```
- components - contains all components
- services - contains Speech Recognition service
- shared
  - config - config for 3rd party libs, theme for Chakra UI in my case
  - hooks - reusable hooks, in my case hook for work with Speech Recognition Service
  - types
- stores - contains stores
```

### Technologies used:
- **zustand** with persist middleware as store manager
  - benefits: abstraction layer over LocalStorage/IndexDB, easy to reuse and test separately
- **chakra-ui** as UI library
  - benefits: easy customized, responsive, and accessible components
- **date-fns** for date formatting
- vite.js as Bundler

### Time spent
- 30 minutes for design solution and mockup in Figma
- 2 hours for main functionality
- 1 hour for testing and polishing

### What can do better
- Add tests
- Add some fancy animations on list update
- Add list virtualization or pagination for better performance on large lists
- Use summary of the note content form AI service for note title

### How to run

```sh
yarn
yarn run dev
```
