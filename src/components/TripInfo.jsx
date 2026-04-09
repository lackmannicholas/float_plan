import FormSection from './FormSection';
import Field, { Input, Textarea } from './FormControls';

export default function TripInfo({ data, onChange }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <FormSection title="Trip Details" icon="🗺️">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Departure Location / Marina" required>
          <Input value={data.departureLocation} onChange={handle('departureLocation')} placeholder="e.g. Clearwater Marina, FL" required />
        </Field>
        <Field label="Destination" required>
          <Input value={data.destination} onChange={handle('destination')} placeholder="e.g. Caladesi Island" required />
        </Field>
        <Field label="Departure Date & Time" required>
          <Input type="datetime-local" value={data.departureTime} onChange={handle('departureTime')} required />
        </Field>
        <Field label="Expected Return Date & Time" required>
          <Input type="datetime-local" value={data.returnTime} onChange={handle('returnTime')} required />
        </Field>
        <Field label="Planned Route / Waypoints" className="sm:col-span-2">
          <Textarea
            value={data.route}
            onChange={handle('route')}
            placeholder="Describe your planned route, waterways, or waypoints…"
            rows={3}
          />
        </Field>
        <Field label="Alternate Destination (if any)">
          <Input value={data.alternateDestination} onChange={handle('alternateDestination')} placeholder="e.g. Honeymoon Island if weather turns" />
        </Field>
        <Field label="Fuel Stop(s)">
          <Input value={data.fuelStops} onChange={handle('fuelStops')} placeholder="e.g. Marker 1 Marina" />
        </Field>
        <Field label="Float Plan Left With (Name)" required>
          <Input value={data.leftWithName} onChange={handle('leftWithName')} placeholder="Full name of person holding this plan" required />
        </Field>
        <Field label="Float Plan Left With (Phone)" required>
          <Input type="tel" value={data.leftWithPhone} onChange={handle('leftWithPhone')} placeholder="555-123-4567" required />
        </Field>
      </div>
    </FormSection>
  );
}
