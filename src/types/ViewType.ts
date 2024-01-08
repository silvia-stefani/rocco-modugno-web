import { ReactElement, ReactNode } from "react"

export type ViewType = {
    id: string,
    label: string,
    element?: ReactElement | ReactNode
}