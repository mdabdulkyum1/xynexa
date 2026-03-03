
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    })

                    const data = await res.json()

                    if (!res.ok) {
                        throw new Error(data.message || "Login failed")
                    }

                    if (data && data.data && data.data.accessToken) {
                        const user = data.data.user
                        return {
                            id: user.id,
                            email: user.email,
                            name: `${user.firstName} ${user.lastName}`,
                            image: user.imageUrl,
                            role: user.role,
                            accessToken: data.data.accessToken,
                            refreshToken: data.data.refreshToken,
                        }
                    }

                    return null
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        newUser: "/sign-up",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.role = token.role
                session.accessToken = token.accessToken
                session.refreshToken = token.refreshToken
            }
            return session
        },
    },
})
