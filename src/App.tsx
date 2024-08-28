import { useState } from 'react'
import axios from 'axios'

function App() {
  const [form, setForm] = useState({ document: '', email: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [changeForm, setChangeForm] = useState(false)

  const [form2, setForm2] = useState({ token: '', password: '', confirmPassword: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post('https://api_login_v1:80/api/v1/auth/forgot-password', { document: form.document, email: form.email })
      .then(res => {
        if (res.status === 200) {
          setMessage(res.data.message || 'Solicitud Generada Con Éxito')
          setForm({ document: '', email: '' })
          setTimeout(() => {
            setChangeForm(true)
          }, 3000)
        }
      })
      .catch(error => {
        if(error.response.status === 400) {
          setError(error.response.data.message || 'Error al Generar Solicitud')
        }
      })
      .finally(() => {
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 3000)
      })
  }

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm2({ ...form2, [e.target.name]: e.target.value })
  }

  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post('https://api_login_v1:80/api/v1/auth/reset-password', { token: form2.token, password: form2.password, confirmPassword: form2.confirmPassword })
      .then(res => {
        if (res.status === 200) {
          setMessage(res.data.message || 'Contraseña Cambiada Con Éxito')
          setForm2({ token: '', password: '', confirmPassword: '' })
          setTimeout(() => setChangeForm(false), 3000)
        }
      }
      )
      .catch(error => {
        if (error.response.status === 400) {
          setError(error.response.data.message || 'Error al Cambiar Contraseña')
        }
      })
      .finally(() => {
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 2500)
      })
  }

  return (
    changeForm === false ? (
      <section className='w-screen h-screen flex flex-col items-center justify-center relative'>

        <form className='flex flex-col gap-2 rounded-md bg-slate-200 p-12 w-[580px]' onSubmit={handleSubmit}>
          <h1 className='text-2xl font-semibold pb-2 text-center text-blue-700'>Recuperar Contraseña</h1>
          <label className='font-semibold text-xl'>N° Documento </label>
          <input className='p-2 rounded-md border-none outline-none text-lg' value={form.document} onChange={handleChange}
            name='document' type='text' required placeholder='N° Documento' />

          <label className='font-semibold text-xl'>Correo Electrónico</label>
          <input className='p-2 rounded-md border-none outline-none text-lg' value={form.email} onChange={handleChange}
            name='email' type='email' required placeholder='************' />

          <button className='bg-blue-400 rounded-md py-2 mt-4 font-semibold hover:bg-blue-600 hover:text-white transition-all'>
            Enviar
          </button>

          <p className='text-xs text-center pt-4'>Este proceso generará un token con 10 min de validez, para realizar el proceso de recuperación, Token será suministrado por el director de tecnología.</p>

        </form>

        <button className='mt-2 underline hover:text-blue-500' onClick={() => setChangeForm(true)}>
          Ya cuento con un token
        </button>

        <div className='absolute bottom-12'>
          {message && <p className='text-green-500 font-semibold text-xl'>{message}</p>}
          {error && <p className='text-red-500 font-semibold text-xl'>{error}</p>}
        </div>
      </section>
    ) : (
      <section className='w-screen h-screen flex flex-col items-center justify-center relative'>
        <form className='flex flex-col gap-2 rounded-md bg-slate-200 p-12 w-[580px]' onSubmit={handleSubmit2}>
          <h1 className='text-2xl font-semibold pb-2 text-center text-blue-700'>Asignar Nueva Contraseña</h1>

          <label className='font-semibold text-xl'>Token:</label>
          <input className='p-2 rounded-md border-none outline-none text-lg'
            name='token' type='text' required onChange={handleChange2} placeholder='Token Generado' />

          <label className='font-semibold text-xl'>Nueva Contraseña</label>
          <input className='p-2 rounded-md border-none outline-none text-lg'
            name='password' type='password' required onChange={handleChange2} placeholder='************' />

          <label className='font-semibold text-xl'>Confirmar Contraseña</label>
          <input className='p-2 rounded-md border-none outline-none text-lg'
            name='confirmPassword' type='password' required onChange={handleChange2} placeholder='************' />

          <button className='bg-blue-400 rounded-md py-2 mt-4 font-semibold hover:bg-blue-600 hover:text-white transition-all'>
            Enviar
          </button>
        </form>

        <button className='mt-2 underline hover:text-blue-500' onClick={() => setChangeForm(false)}>
          Solicitar Nuevo Token
        </button>

        <div className='absolute bottom-12'>
          {message && <p className='text-green-500 font-semibold text-xl'>{message}</p>}
          {error && <p className='text-red-500 font-semibold text-xl'>{error}</p>}
        </div>
      </section>
    )
  )
}

export default App
