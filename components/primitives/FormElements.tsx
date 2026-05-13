'use client';

import { forwardRef, ElementRef, useState, useEffect, useId } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { COLORS, MOTION } from '@/lib/tokens';

// ===== Base Input Variants =====
const inputVariants = cva(
  'flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm placeholder:text-text-placeholder transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'border-gray-medium text-text-primary',
          'focus:border-gold focus:ring-gold-transparent-50',
          'hover:border-gray-light',
        ].join(' '),
        error: [
          'border-error text-text-primary',
          'focus:border-error focus:ring-error/30',
          'hover:border-error/80',
        ].join(' '),
        success: [
          'border-success text-text-primary',
          'focus:border-success focus:ring-success/30',
          'hover:border-success/80',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-2.5 py-1.5 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: true,
    },
  }
);

// ===== Form Field Wrapper =====
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  animatedLabel?: boolean;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({
    className,
    children,
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    animatedLabel = true,
    ...props
  }, ref) => {
    const id = useId();
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5', className)}
        {...props}
      >
        {label && (
          <motion.label
            htmlFor={id}
            className={cn(
              'text-sm font-medium text-text-primary',
              disabled && 'opacity-50'
            )}
            initial={animatedLabel ? { opacity: 0, y: -5 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {label}
            {required && (
              <span className="ml-1 text-error" aria-hidden="true">
                *
              </span>
            )}
          </motion.label>
        )}

        {children}

        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {error && (
              <p
                id={errorId}
                className="text-xs text-error mt-1 flex items-center gap-1"
                role="alert"
              >
                <svg
                  className="h-3 w-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
            {!error && helperText && (
              <p id={helperId} className="text-xs text-text-tertiary mt-1">
                {helperText}
              </p>
            )}
          </motion.div>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

// ===== Input Component =====
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'children' | 'ref'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animatedLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      fullWidth = true,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      animatedLabel = true,
      id: propId,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      // Check if input has value (for controlled components)
      if (typeof props.value !== 'undefined') {
        setHasValue(!!props.value);
      } else if (typeof props.defaultValue !== 'undefined') {
        setHasValue(!!props.defaultValue);
      }
    }, [props.value, props.defaultValue]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const inputVariant = error ? 'error' : variant;

    return (
      <FormField
        label={label}
        helperText={helperText}
        error={error}
        required={required}
        disabled={disabled}
        animatedLabel={animatedLabel}
      >
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {leftIcon}
            </div>
          )}
          <motion.input
            ref={ref}
            id={id}
            className={cn(
              inputVariants({
                variant: inputVariant,
                size,
                fullWidth,
                className,
              }),
              leftIcon && 'pl-9',
              rightIcon && 'pr-9'
            )}
            required={required}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            whileFocus={{
              scale: 1.005,
              transition: {
                type: 'spring',
                ...MOTION.spring.gentle,
              },
            }}
            {...(props as any)}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {rightIcon}
            </div>
          )}
          
          {/* Animated border effect on focus */}
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                boxShadow: `0 0 0 2px ${inputVariant === 'error' ? COLORS.error : COLORS.gold}20`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      </FormField>
    );
  }
);
Input.displayName = 'Input';

// ===== Textarea Component =====
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'children' | 'ref'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  animatedLabel?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      fullWidth = true,
      label,
      helperText,
      error,
      animatedLabel = true,
      resize = 'vertical',
      id: propId,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      if (typeof props.value !== 'undefined') {
        setHasValue(!!props.value);
      } else if (typeof props.defaultValue !== 'undefined') {
        setHasValue(!!props.defaultValue);
      }
    }, [props.value, props.defaultValue]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const inputVariant = error ? 'error' : variant;
    const resizeClass = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }[resize];

    return (
      <FormField
        label={label}
        helperText={helperText}
        error={error}
        required={required}
        disabled={disabled}
        animatedLabel={animatedLabel}
      >
        <div className="relative">
          <motion.textarea
            ref={ref}
            id={id}
            className={cn(
              inputVariants({
                variant: inputVariant,
                size,
                fullWidth,
                className,
              }),
              resizeClass,
              'min-h-[80px] py-2'
            )}
            required={required}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            whileFocus={{
              scale: 1.005,
              transition: {
                type: 'spring',
                ...MOTION.spring.gentle,
              },
            }}
            {...(props as any)}
          />

          {/* Animated border effect on focus */}
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                boxShadow: `0 0 0 2px ${inputVariant === 'error' ? COLORS.error : COLORS.gold}20`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      </FormField>
    );
  }
);
Textarea.displayName = 'Textarea';

// ===== Select Component =====
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'ref'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  animatedLabel?: boolean;
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      fullWidth = true,
      label,
      helperText,
      error,
      animatedLabel = true,
      options,
      placeholder,
      children,
      id: propId,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const inputVariant = error ? 'error' : variant;

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleMouseDown = () => {
      setIsOpen(true);
    };

    const handleMouseUp = () => {
      setIsOpen(false);
    };

    return (
      <FormField
        label={label}
        helperText={helperText}
        error={error}
        required={required}
        disabled={disabled}
        animatedLabel={animatedLabel}
      >
        <div className="relative">
          <motion.select
            ref={ref}
            id={id}
            className={cn(
              inputVariants({
                variant: inputVariant,
                size,
                fullWidth,
                className,
              }),
              'appearance-none pr-10 cursor-pointer'
            )}
            required={required}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            whileFocus={{
              scale: 1.005,
              transition: {
                type: 'spring',
                ...MOTION.spring.gentle,
              },
            }}
            animate={isOpen ? { scale: 1.005 } : {}}
            {...(props as any)}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </motion.select>
          
          {/* Dropdown indicator */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
            <svg
              className="h-4 w-4 transition-transform duration-200"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          
          {/* Animated border effect on focus */}
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                boxShadow: `0 0 0 2px ${inputVariant === 'error' ? COLORS.error : COLORS.gold}20`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      </FormField>
    );
  }
);
Select.displayName = 'Select';

// ===== React Hook Form Integration Components =====
// These components are specifically designed for use with react-hook-form
import {
  useFormContext,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from 'react-hook-form';

export interface FormInputProps<TFieldValues extends FieldValues>
  extends Omit<InputProps, 'name' | 'error' | 'defaultValue'>,
    Pick<ControllerProps<TFieldValues>, 'name' | 'rules' | 'defaultValue'> {
  transform?: {
    input?: (value: any) => string;
    output?: (value: string) => any;
  };
}

function FormInput<TFieldValues extends FieldValues>({
  name,
  rules,
  defaultValue,
  transform,
  ...props
}: FormInputProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name as Path<TFieldValues>}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          {...field}
          error={fieldState.error?.message}
          value={transform?.input ? transform.input(field.value) : field.value}
          onChange={(e) => {
            const value = transform?.output
              ? transform.output(e.target.value)
              : e.target.value;
            field.onChange(value);
          }}
        />
      )}
    />
  );
}

export interface FormTextareaProps<TFieldValues extends FieldValues>
  extends Omit<TextareaProps, 'name' | 'error' | 'defaultValue'>,
    Pick<ControllerProps<TFieldValues>, 'name' | 'rules' | 'defaultValue'> {}

function FormTextarea<TFieldValues extends FieldValues>({
  name,
  rules,
  defaultValue,
  ...props
}: FormTextareaProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name as Path<TFieldValues>}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Textarea
          {...props}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export interface FormSelectProps<TFieldValues extends FieldValues>
  extends Omit<SelectProps, 'name' | 'error' | 'defaultValue'>,
    Pick<ControllerProps<TFieldValues>, 'name' | 'rules' | 'defaultValue'> {}

function FormSelect<TFieldValues extends FieldValues>({
  name,
  rules,
  defaultValue,
  ...props
}: FormSelectProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name as Path<TFieldValues>}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          {...field}
          error={fieldState.error?.message}
          value={field.value ?? ''}
        />
      )}
    />
  );
}

// ===== Export All Components =====
export {
  Input,
  Textarea,
  Select,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  inputVariants,
};