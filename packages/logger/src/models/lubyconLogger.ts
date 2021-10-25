export interface LubyconLoggerConfig extends LubyconLoggerConfigProps {
  v?: string;
  tid?: string;
  sid?: string;
  sdid?: string;
  ett?: number;
}

export interface LubyconLoggerConfigProps {
  cid?: string;
  pl?: string;
  an?: string;
}
