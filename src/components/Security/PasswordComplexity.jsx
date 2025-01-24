export default function PasswordComplexity({ password }) {
  const requirements = [
    { regex: /.{8,}/, text: 'Minimum 8 characters' },
    { regex: /[A-Z]/, text: 'At least one uppercase letter' },
    { regex: /[a-z]/, text: 'At least one lowercase letter' },
    { regex: /[0-9]/, text: 'At least one number' },
    { regex: /[^A-Za-z0-9]/, text: 'At least one special character' }
  ]

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
      <h4 className="text-sm font-medium text-blue-900 mb-2">Password Requirements</h4>
      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${
              req.regex.test(password) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">{req.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
