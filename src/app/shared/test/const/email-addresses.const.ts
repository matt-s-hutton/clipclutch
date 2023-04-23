export const VALID_EMAILS: string[] = [
    'prettyandsimple@example.com',
    'very.common@example.com',
    'disposable.style.email.with+symbol@example.com',
    'other.email-with-dash@example.com',
    'fully-qualified-domain@example.com',
    'x@example.com',
    'example-indeed@strange-example.com',
    'admin@mailserver1',
    '/#!$%&\'*+-/=?^_`{}|~@example.org',
    'example@s.solutions',
    'user@localserver',
    'user@tt',
];

export const INVALID_EMAILS: string[] = [
    'Abc.example.com',
    'A@b@c@example.com',
    'a"b(c)d,e:f;gi[j\k]l@example.com',
    'just"not"right@example.com',
    'this is"not\allowed@example.com',
    'this\ still\"not\allowed@example.com',
    '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
    'john..doe@example.com',
    'john.doe@example..com',
    '"much.more unusual"@example.com',
];