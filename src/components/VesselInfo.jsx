import FormSection from './FormSection';
import Field, { Input, Select } from './FormControls';

export default function VesselInfo({ data, onChange }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <FormSection title="Vessel Information" icon="⛵">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Vessel Name" required>
          <Input value={data.name} onChange={handle('name')} placeholder="e.g. Sea Breeze" required />
        </Field>
        <Field label="Registration / Documentation #" required>
          <Input value={data.registration} onChange={handle('registration')} placeholder="e.g. FL1234AB" required />
        </Field>
        <Field label="Vessel Type" required>
          <Select value={data.type} onChange={handle('type')} required>
            <option value="">Select type…</option>
            <option>Motorboat</option>
            <option>Sailboat</option>
            <option>Pontoon</option>
            <option>Kayak / Canoe</option>
            <option>Personal Watercraft (PWC)</option>
            <option>Houseboat</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Make / Manufacturer">
          <Input value={data.make} onChange={handle('make')} placeholder="e.g. Sea Ray" />
        </Field>
        <Field label="Model">
          <Input value={data.model} onChange={handle('model')} placeholder="e.g. Sundancer 320" />
        </Field>
        <Field label="Year">
          <Input value={data.year} onChange={handle('year')} placeholder="e.g. 2019" />
        </Field>
        <Field label="Hull Length (ft)">
          <Input value={data.length} onChange={handle('length')} placeholder="e.g. 24" />
        </Field>
        <Field label="Hull Color (above waterline)">
          <Input value={data.hullColor} onChange={handle('hullColor')} placeholder="e.g. White / Blue trim" />
        </Field>
        <Field label="Deck / Trim Color">
          <Input value={data.deckColor} onChange={handle('deckColor')} placeholder="e.g. Beige" />
        </Field>
        <Field label="Engine Type">
          <Select value={data.engineType} onChange={handle('engineType')}>
            <option value="">Select…</option>
            <option>Inboard</option>
            <option>Outboard</option>
            <option>Inboard/Outboard (I/O)</option>
            <option>Jet</option>
            <option>Sail / No Engine</option>
          </Select>
        </Field>
        <Field label="Engine HP">
          <Input value={data.engineHp} onChange={handle('engineHp')} placeholder="e.g. 250" />
        </Field>
        <Field label="Fuel Capacity (gallons)">
          <Input value={data.fuelCapacity} onChange={handle('fuelCapacity')} placeholder="e.g. 40" />
        </Field>
        <Field label="VHF Radio Call Sign / MMSI">
          <Input value={data.callSign} onChange={handle('callSign')} placeholder="e.g. WDG1234" />
        </Field>
        <Field label="Cell Phone on Board">
          <Input value={data.cellPhone} onChange={handle('cellPhone')} placeholder="e.g. 555-123-4567" type="tel" />
        </Field>
      </div>
    </FormSection>
  );
}
