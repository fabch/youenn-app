"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { DatesSetArg, EventClickArg, EventContentArg } from '@fullcalendar/core/index.js'
import { useMemo, useState } from 'react'
import { Tables } from '@/lib/supabase/schema.types'
import { EventContent } from './event-content'
import ServiceDrawer from './service-drawer'
import { selectServices } from '@/app/actions'

type Service = Tables<'service'> & {
 service_material: Tables<'service_material'>[]
}

const transformToEvents = (services: Service[]) => services.map(service => ({
  id: service.uid,
  title: service.name +  ' (' + service.client + ')',
  start: service.start_at,
  end: service.end_date,
  extendedProps: { ...service }
}))

export default function Calendar() {

  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service|null>(null)

  const fetchServices = async () => {
    const data = await selectServices()
    setServices(data)
  }

  const handleEventClick = (arg:EventClickArg) => {
    console.log(selectedService, arg)
    setSelectedService(arg.event.extendedProps as Service)
  }

  const handleDateSet = (arg:DatesSetArg) => {
    console.log(arg)
    setSelectedService(null)
    fetchServices()
  }

  const events = useMemo(
    () => transformToEvents(services),
    [services]
  );

  const open = useMemo(
    () => selectedService !== null,
    [selectedService]
  )

  return (
    <>
    <ServiceDrawer />
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      weekends={true}
      events={events}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
      datesSet={handleDateSet}
    />
    </>
  )
}

// a custom render function
function renderEventContent(eventInfo: EventContentArg) {
  return (
    <EventContent eventInfo={eventInfo} />
  )
}