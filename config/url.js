const isProduction = process.env.NODE_ENV.trim() === 'production',
  development = {
    domain: 'localhost'
  },
  production = {
    domain: 'zooman090.github.io'
  };

module.exports = isProduction ? production : development;
