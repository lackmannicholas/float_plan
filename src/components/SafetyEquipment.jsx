import FormSection from './FormSection';
import Field, { Input, Checkbox } from './FormControls';

const EQUIPMENT_LIST = [
  { key: 'lifejackets', label: 'Life Jackets / PFDs' },
  { key: 'throwable', label: 'Throwable Flotation Device' },
  { key: 'visualSignals', label: 'Visual Distress Signals (flares)' },
  { key: 'fireExtinguisher', label: 'Fire Extinguisher' },
  { key: 'vhfRadio', label: 'VHF Marine Radio' },
  { key: 'epirb', label: 'EPIRB / PLB (Emergency Beacon)' },
  { key: 'anchor', label: 'Anchor & Line' },
  { key: 'firstAid', label: 'First Aid Kit' },
  { key: 'flashlight', label: 'Flashlight' },
  { key: 'toolKit', label: 'Tool Kit / Spare Parts' },
  { key: 'bilgePump', label: 'Bilge Pump' },
  { key: 'horn', label: 'Sound Producing Device (horn/whistle)' },
  { key: 'compass', label: 'Compass' },
  { key: 'gps', label: 'GPS / Chart Plotter' },
  { key: 'raft', label: 'Life Raft' },
  { key: 'foodWater', label: 'Food & Water Supplies' },
];

export default function SafetyEquipment({ data, onChange }) {
  const handleCheck = (key) => (e) =>
    onChange({ ...data, equipment: { ...data.equipment, [key]: e.target.checked } });

  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <FormSection title="Safety Equipment" icon="🦺">
      <div className="mb-4">
        <p className="text-sm text-slate-500 mb-3">Check all items that are aboard the vessel.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {EQUIPMENT_LIST.map(({ key, label }) => (
            <Checkbox
              key={key}
              label={label}
              checked={!!data.equipment?.[key]}
              onChange={handleCheck(key)}
            />
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Number of Life Jackets">
          <Input
            type="number"
            min="0"
            value={data.lifejacketCount}
            onChange={handle('lifejacketCount')}
            placeholder="e.g. 4"
          />
        </Field>
        <Field label="VHF Channel Being Monitored">
          <Input value={data.vhfChannel} onChange={handle('vhfChannel')} placeholder="e.g. Channel 16" />
        </Field>
        <Field label="EPIRB / PLB Registration #">
          <Input value={data.epirbId} onChange={handle('epirbId')} placeholder="e.g. ADFB12345678" />
        </Field>
      </div>
    </FormSection>
  );
}
