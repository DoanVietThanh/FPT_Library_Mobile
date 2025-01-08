/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ActionError } from '~/types/action-response'
import i18n from 'i18next' // Import the i18n instance directly

/* eslint-disable @typescript-eslint/no-explicit-any */
type CustomOptions = RequestInit & {
  baseUrl?: string
  lang?: string
  searchParams?: Record<string, string | number | boolean | null | undefined>
}

type OkResponse<TData = undefined> = {
  resultCode: string
  message: string
  data: TData
}

class HttpError extends Error {
  resultCode: string
  type: 'unknown' | 'warning' | 'error' | 'form'
  fieldErrors: Record<string, string[]>
  constructor({
    fieldErrors,
    message,
    type,
    resultCode,
  }: {
    resultCode: string
    type: 'unknown' | 'warning' | 'error' | 'form'
    message?: string
    fieldErrors?: Record<string, string[]>
  } & (
    | {
        type: 'unknown'
      }
    | {
        type: 'warning' | 'error'
        message: string
      }
    | {
        type: 'form'
        fieldErrors: Record<string, string[]>
      }
  )) {
    super(message)
    this.type = type
    this.resultCode = resultCode
    this.fieldErrors = fieldErrors || {}
  }
}

export function handleHttpError(error: unknown): ActionError {
  if (!(error instanceof HttpError) || error.type === 'unknown') {
    return {
      isSuccess: false,
      typeError: 'unknown',
    }
  }

  if (Object.keys(error.fieldErrors).length !== 0 && error.type === 'form') {
    return {
      typeError: 'form',
      fieldErrors: error.fieldErrors,
      isSuccess: false,
    }
  }

  if (error.message && error.type !== 'form') {
    return {
      isSuccess: false,
      typeError: error.type,
      messageError: error.message,
      resultCode: error.resultCode,
    }
  }

  return {
    isSuccess: false,
    typeError: 'unknown',
  }
}

const request = async <TData = undefined>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions,
) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined

  const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept-Language': options?.lang ?? i18n.language ?? 'vi',
  }

  const baseUrl =
    options?.baseUrl === undefined ? process.env.EXPO_PUBLIC_API_ENDPOINT! : options.baseUrl

  const fetchUrl = buildUrl(baseUrl, url, options?.searchParams)

  const res = await fetch(fetchUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  })

  const payload = (await res.json()) as OkResponse<TData>

  if (process.env.NEXT_PUBLIC_LOG_FETCH !== 'false')
    console.log({
      url: fetchUrl,
      headers: {
        ...baseHeaders,
        ...options?.headers,
      },
      body: body ? (body instanceof FormData ? body : JSON.parse(body)) : null,
      payload,
    })

  if (!res.ok || !payload.resultCode.includes('Success')) {
    if (res.ok) {
      throw new HttpError({
        type: payload.resultCode.includes('Fail') ? 'error' : 'warning',
        message: payload.message,
        resultCode: payload.resultCode,
      })
    }

    if (res.status !== 422) {
      throw new HttpError({
        type: 'unknown',
        resultCode: '',
      })
    }

    throw new HttpError({
      type: 'form',
      // @ts-ignore
      fieldErrors: payload.Extensions || {},
      resultCode: '',
    })
  }

  return payload
}

export const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PUT', url, { ...options, body })
  },
  patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PATCH', url, { ...options, body })
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('DELETE', url, options)
  },
  multiDelete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('DELETE', url, { ...options, body })
  },
}

const buildUrl = (
  baseUrl: string,
  url: string,
  searchParams: Record<string, string | number | boolean | null | undefined> | undefined,
) => {
  const newSearchParams = new URLSearchParams()

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        newSearchParams.append(key, value.toString())
      }
    })
  }

  return `${baseUrl}${url}?${newSearchParams.toString()}`
}
