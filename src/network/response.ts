interface ResponseProps {
  error: boolean
  message: unknown
  method: string
  res: CustomResponse
  status: number
}

const response = ({
  error,
  message,
  method,
  res,
  status
}: ResponseProps): void => {
  res.status(status).send({ error, method, message })
}

export { response }
