import { Button } from "@/components/ui/button"
import { EventContentArg } from "@fullcalendar/core/index.js"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { InfoIcon } from "lucide-react"

export function EventContent({ eventInfo }: Readonly<{
    eventInfo:EventContentArg
}>) {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <>
                <b>{eventInfo.event.title}</b> <InfoIcon />
            </>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <i>{eventInfo.event.extendedProps.name}</i>
            <i>{eventInfo.event.extendedProps.client}</i>
            <ul>
            {eventInfo.event.extendedProps.service_material.map(entry => {
                <li key={entry.material}>{entry.material} / {entry.quantity}</li>
            })}
            </ul>
        </PopoverContent>
    </Popover>
  )
}
