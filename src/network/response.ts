interface ResponseProps {
  error: boolean
  server: string
  message: unknown
  method: string
  res: CustomResponse
  status: number
}

const response = ({
  error,
  server,
  message,
  method,
  res,
  status
}: ResponseProps): void => {
  res.status(status).send({ error, server, method, message })
}

export { response }
