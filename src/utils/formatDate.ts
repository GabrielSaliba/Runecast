import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date) {
  try {
    return format(parseISO(date), 'd MMM yy', { locale: ptBR })
  } catch {
    return '-'
  }
}

export function formatFullDate(date) {
  try {
    return format(parseISO(date), "dd 'de' MMMM 'de' y", { locale: ptBR })
  } catch {
    return '-'
  }
}