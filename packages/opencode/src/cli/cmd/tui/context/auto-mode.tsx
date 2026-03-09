import { createContext, useContext, type ParentProps } from "solid-js"
import { createSignal } from "solid-js"

type AutoModeContext = {
  enabled: () => boolean
  toggle: () => void
}

const ctx = createContext<AutoModeContext>()

export function AutoModeProvider(props: ParentProps) {
  const [enabled, setEnabled] = createSignal(false)

  const value: AutoModeContext = {
    enabled,
    toggle: () => setEnabled((prev) => !prev),
  }

  return <ctx.Provider value={value}>{props.children}</ctx.Provider>
}

export function useAutoMode() {
  const value = useContext(ctx)
  if (!value) {
    throw new Error("useAutoMode must be used within an AutoModeProvider")
  }
  return value
}
