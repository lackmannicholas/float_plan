import FormSection from './FormSection';
import Field, { Input } from './FormControls';

export default function VehicleInfo({ data, onChange }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <FormSection title="Tow Vehicle / Trailer Information" icon="🚗">
      <p className="text-sm text-slate-500 mb-4">
        Leave this section blank if you launched from a marina and your vehicle is not parked at the launch.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Vehicle Make">
          <Input value={data.vehicleMake} onChange={handle('vehicleMake')} placeholder="e.g. Ford" />
        </Field>
        <Field label="Vehicle Model">
          <Input value={data.vehicleModel} onChange={handle('vehicleModel')} placeholder="e.g. F-150" />
        </Field>
        <Field label="Vehicle Year">
          <Input value={data.vehicleYear} onChange={handle('vehicleYear')} placeholder="e.g. 2021" />
        </Field>
        <Field label="Vehicle Color">
          <Input value={data.vehicleColor} onChange={handle('vehicleColor')} placeholder="e.g. Silver" />
        </Field>
        <Field label="License Plate #">
          <Input value={data.licensePlate} onChange={handle('licensePlate')} placeholder="e.g. ABC-1234" />
        </Field>
        <Field label="State">
          <Input value={data.state} onChange={handle('state')} placeholder="e.g. FL" maxLength={2} />
        </Field>
        <Field label="Parked At (Boat Ramp / Marina Name)" className="sm:col-span-2">
          <Input value={data.parkedAt} onChange={handle('parkedAt')} placeholder="e.g. Ben T. Davis Beach Boat Ramp, Tampa, FL" />
        </Field>
        <Field label="Trailer License Plate #">
          <Input value={data.trailerPlate} onChange={handle('trailerPlate')} placeholder="e.g. TR-5678" />
        </Field>
      </div>
    </FormSection>
  );
}
