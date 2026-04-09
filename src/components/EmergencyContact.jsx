import FormSection from './FormSection';
import Field, { Input, Textarea } from './FormControls';

export default function EmergencyContact({ data, onChange }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <FormSection title="Emergency Contact & Instructions" icon="🚨">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
        <strong>Important:</strong> Give this completed float plan to a trusted friend, family member, or marina.
        If you do not return or check in by the expected return time, the person holding this plan should
        take action.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Field label="Emergency Contact Name" required>
          <Input value={data.contactName} onChange={handle('contactName')} placeholder="Full name" required />
        </Field>
        <Field label="Relationship">
          <Input value={data.relationship} onChange={handle('relationship')} placeholder="e.g. Spouse, Friend" />
        </Field>
        <Field label="Primary Phone" required>
          <Input type="tel" value={data.phone} onChange={handle('phone')} placeholder="555-123-4567" required />
        </Field>
        <Field label="Alternate Phone">
          <Input type="tel" value={data.altPhone} onChange={handle('altPhone')} placeholder="555-123-4567" />
        </Field>
        <Field label="Email Address" className="sm:col-span-2">
          <Input type="email" value={data.email} onChange={handle('email')} placeholder="email@example.com" />
        </Field>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          If I Do Not Return / Check In By My Expected Return Time:
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <Field
            label="Actions to Take"
            hint="e.g. Call my cell, contact the marina, call USCG Search & Rescue at 305-415-6800"
          >
            <Textarea
              value={data.actions}
              onChange={handle('actions')}
              placeholder="Describe what the plan holder should do if you don't return on time…"
              rows={4}
            />
          </Field>
          <Field label="Coast Guard Sector / Local Authority">
            <Input
              value={data.coastGuardContact}
              onChange={handle('coastGuardContact')}
              placeholder="e.g. USCG Sector St. Petersburg: 727-824-7506"
            />
          </Field>
          <Field label="Additional Notes">
            <Textarea
              value={data.notes}
              onChange={handle('notes')}
              placeholder="Any other relevant information…"
              rows={3}
            />
          </Field>
        </div>
      </div>
    </FormSection>
  );
}
